#[macro_use]
extern crate diesel;

use actix_web::{
    get, post, middleware, web, App, Error, HttpResponse, HttpServer, Responder
};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

pub mod actions;
pub mod schema;
pub mod models;
mod handlers;
mod something;

type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("ecks deee")
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
        let res = HttpResponse::NotFound().body("ksdjfoawenjfiha something bad");

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


#[get("/stock")]
async fn get_stock(
    pool: web::Data<DbPool>
) -> Result<HttpResponse, Error> {
    let products = web::block(move || {
        let conn = pool.get()?;
        actions::find_products_from_stock(&conn)
    })
    .await?
    .map_err(actix_web::error::ErrorInternalServerError)?;

    if let Some(products) = products {
        Ok(HttpResponse::Ok().json(products))
    } else {
        let res = HttpResponse::NotFound().body("ksdjfoawenjfiha something bad");

        Ok(res)
    }
}

#[post("/stock")]
async fn add_product_to_stock(
    pool: web::Data<DbPool>,
    form: web::Json<models::Stock>,
) -> Result<HttpResponse, Error> {
    let product = web::block(move || {
        let conn = pool.get()?;

        let product = models::Stock {
            code: form.code.to_owned(),
            amount: form.amount.to_owned(),
        };
        actions::insert_new_stock_product(&conn, &product)
    })
    .await?
    .map_err(actix_web::error::ErrorInternalServerError)?;

    Ok(HttpResponse::Ok().json(product))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    // database connection pool
    let conn_spec = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<SqliteConnection>::new(conn_spec);
    let pool = r2d2::Pool::builder().build(manager).expect("Failed to create pool");

    log::info!("Inwentaryzator backend is running on 8080!");

    HttpServer::new(move || {
        App::new()
            // set up DB pool to be used with web::Data<Pool> extractor
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default())
            .service(hello)
            .service(get_products)
            .service(add_product)
            .service(get_stock)
            .service(add_product_to_stock)
            .route("/something", web::get().to(something::json_test))
            .route("/handlers", web::get().to(handlers::get_something))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

