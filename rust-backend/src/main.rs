use actix_web::{
    body::BoxBody, http::header::ContentType, get, web, App, HttpRequest,
    HttpResponse, HttpServer, Responder
};
use serde::Serialize;

pub mod something;

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
    println!("Inwentaryzator backend is running on 8080!");
    HttpServer::new(|| {
        App::new()
            .configure(something::config)
            .service(echo)
            .service(hello)
            .service(json_test)
            .route("/hey", web::get().to(manual_hello))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
