const {MongoClient} = require("mongodb");
const Db =  process.env.ATLAS_URI;

const client = new MongoClient(Db, {
   
});


var _db;

module.exports = {
    connectToServer: function (callback){
        client.connect(function (error, db){
            // Verify we got the "db " object
            if(db){
                _db = db.db("ebay_clone");
                console.log(`
                🚀 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
                Successfully Connected to MongoDB , Lets fly 
                🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀`);
            }
            return callback(error);
        });
    },
    getDb: function(){
        return _db;
    },
};
