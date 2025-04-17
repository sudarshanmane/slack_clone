🚫 Why You Should NOT Index Every Field

1. 🔻 Increased Write Overhead
   Every time you insert, update, or delete a document, all indexes must be updated.

This slows down insertOne, updateMany, etc.

📉 Write performance degrades with too many indexes.

### text indexing

this will be very hevy cause of the lot of the data. all the indexing will be done on it.
so can chose the elstic search or the aws search for these kind of searching

Message.find({
$text: {
$search: 'urgent critical'
}
});

$text: { $search: "urgent critical" }
Matches whole words only

Works like "urgent" OR "critical"

❌ Not fuzzy, not partial
matches all text indexed fields having either urgent, critical or both

if want partial matching

### compound indexing

## channelSchema.index({ name: 1, workspaceId: 1 }, { unique: true });

- this will allow only uniqe name and the workspace id

## db.products.createIndex({ category: 1, price: 1 })

This compound index will help speed up queries that:

✅ Match category and optionally price

1. Match on category only
   db.products.find({ category: "Shoes" }) // ✅ Uses index

2. Match on category + price

   db.products.find({ category: "Shoes", price: 999 }) // ✅ Uses index fully

3. Sort by price within category

   db.products.find({ category: "Shoes" }).sort({ price: 1 }) // ✅ Fully uses index
   ⚠️ But it won’t help for:
   ❌ Match on price only:

   db.products.find({ price: 999 }) // 🚫 Index NOT used efficiently

Query Uses Index?
{ category: "Shoes" } ✅ Yes
{ category: "Shoes", price: 999 } ✅ Yes
{ price: 999 } ❌ No
.sort({ price: 1 }) with category ✅ Yes
.sort({ price: 1 }) only ❌ No
