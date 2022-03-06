#[macro_use]
extern crate diesel;

use actix_web::{
    body::BoxBody, http::header::ContentType, get, post, middleware, web, App, Error, HttpRequest,
    HttpResponse, HttpServer, Responder
};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use serde::Serialize;

pub mod something;
pub mod actions;
pub mod schema;
pub mod models;

type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("ecks deee")
}

#[get("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[get("/a")]
async fn json_test() -> impl Responder {
    MyObj { name: "asdfasdfasdfasd" }
}

#[get("/products")]
async fn get_products(
    pool: web::Data<DbPool>
) -> Result<HttpResponse, Error> {
    let products = web::block(move || {
        let conn = pool.get()?;
        actions::find_products(&conn)
    })
    .await?
    .map_err(actix_web::error::ErrorInternalServerError)?;

    if let Some(products) = products {
        Ok(HttpResponse::Ok().json(products))
    } else {
        let res = HttpResponse::NotFound()
            .body("ksdjfoawenjfawehfniawenfihanwef something bad");

        Ok(res)
    }
}

#[post("/products")]
async fn add_product(
    pool: web::Data<DbPool>,
    form: web::Json<models::Product>,
) -> Result<HttpResponse, Error> {
    let product = web::block(move || {
        let conn = pool.get()?;

        let new_product = models::Product {
            code: form.code.to_owned(),
            name: form.name.to_owned(),
            measure_unit: form.measure_unit.to_owned(),
            price: form.price.to_owned(),
        };
        actions::insert_new_product(&conn, &new_product)
    })
    .await?
    .map_err(actix_web::error::ErrorInternalServerError)?;

    Ok(HttpResponse::Ok().json(product))
}


#[derive(Serialize)]
struct MyObj {
    name: &'static str,
}

impl Responder for MyObj {
    type Body = BoxBody;

    fn respond_to(self, _req: &HttpRequest) -> HttpResponse<Self::Body> {
        let body = serde_json::to_string(&self).unwrap();

        HttpResponse::Ok()
            .content_type(ContentType::json())
            .body(body)
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    // database connection pool
    let conn_spec = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL");
    let manager = ConnectionManager::<SqliteConnection>
        ::new(conn_spec);
    let pool = r2d2::Pool::builder().build(manager)
        .expect("Failed to create pool");

    log::info!("Inwentaryzator backend is running on 8080!");

    HttpServer::new(move || {
        App::new()
            // set up DB pool to be used with web::Data<Pool> extractor
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default())
            .configure(something::config)
            .service(echo)
            .service(hello)
            .service(json_test)
            .service(get_products)
            .service(add_product)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

