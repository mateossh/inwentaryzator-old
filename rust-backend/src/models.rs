use serde::{Deserialize, Serialize};

use crate::schema::products;
use crate::schema::stock;

#[derive(Debug, Clone, Serialize, Deserialize, Identifiable, Queryable, Insertable)]
#[table_name = "products"]
#[primary_key(code)]
pub struct Product {
    pub code: String,
    pub name: String,
    pub price: f32,
    pub measure_unit: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Associations, Identifiable, Queryable, Insertable)]
#[table_name = "stock"]
#[primary_key(code)]
#[belongs_to(Product, foreign_key = "code")]
pub struct Stock {
    pub code: String,
    pub amount: i32,
}
