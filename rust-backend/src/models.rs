use serde::{Deserialize, Serialize};

use crate::schema::products;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable)]
pub struct Product {
    pub code: String,
    pub name: String,
    pub price: f32,
    pub measure_unit: String,
}
