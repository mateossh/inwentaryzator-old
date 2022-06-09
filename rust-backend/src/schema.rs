table! {
    products (code) {
        code -> Text,
        name -> Text,
        price -> Float4,
        measure_unit -> Text,
    }
}

table! {
    stock (code) {
        code -> Text,
        amount -> Integer,
    }
}

allow_tables_to_appear_in_same_query!(
    products,
    stock,
);
