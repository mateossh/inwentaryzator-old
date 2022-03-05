use actix_web::{web, HttpResponse};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/something")
            .route(web::get().to(|| async { HttpResponse::Ok().body("something") }))
    );
}
