use diesel::prelude::*;

use crate::models;

type DbError = Box<dyn std::error::Error + Send + Sync>;

// run query using diesel to find product and return it
pub fn find_products(
    conn: &SqliteConnection
) -> Result<Option<Vec<models::Product>>, DbError> {
    use crate::schema::products::dsl::*;

    let zxcv = products
        .load::<models::Product>(conn)
        .optional()?;

    Ok(zxcv)
}

pub fn insert_new_product(
    // prevent collision with 'name' column imported inside the function
    conn: &SqliteConnection,
    new_product: &models::Product,
) -> Result<models::Product, DbError> {
    // It is common when using Diesel with Actix Web to import schema-related
    // modules inside a function's scope (rather than the normal module's scope)
    // to prevent import collisions and namespace pollution.
    use crate::schema::products::dsl::*;

    // let new_product = models::Product {
    //     code: "1923847".to_string(),
    //     name: nm.to_owned(),
    //     measure_unit: "szt.".to_string(),
    //     price: 12.00,
    // };

    // diesel::insert_into(products).values(&new_product).execute(conn)?;
    diesel::insert_into(products).values(new_product).execute(conn)?;

    let new_product = new_product.to_owned();
    Ok(new_product)
}
