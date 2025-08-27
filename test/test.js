var assert = require('assert');
var to_vietnamese = require('../src/n2vi');
describe('Number to Vietnamese text', function() {
   it("should convert up to hungreds of billion ", function() {
      assert.equal(to_vietnamese(120020120100),'một trăm hai mươi tỷ không trăm hai mươi triệu một trăm hai mươi nghìn một trăm')
   })

   it("should convert 1 to 9",function(){
      assert.equal(to_vietnamese(12345678900),"mười hai tỷ ba trăm bốn mươi lăm triệu sáu trăm bảy mươi tám nghìn chín trăm")
   })

   it("should flxsexible in 05 and 21",function(){
    assert.equal(to_vietnamese(105000),"một trăm lẻ năm nghìn");
    assert.equal(to_vietnamese(21000),"hai mươi mốt nghìn");
   });

   it("should add currency",function(){
      assert.equal(to_vietnamese(21000,'đồng'),"hai mươi mốt nghìn đồng")
   });
   it("should beable to handle millions", function(){
      assert.equal(to_vietnamese(21000000,'đồng'),"hai mươi mốt triệu đồng")
   })
   it("should beable to handle of billions", function(){
      assert.equal(to_vietnamese(21000000000,'đồng'),"hai mươi mốt tỷ đồng")
   })
   it("should beable to handle even thousand of billions", function(){
      assert.equal(to_vietnamese(210000000000001,'đồng'),"hai trăm mười nghìn tỷ không trăm lẻ một đồng")
   })
   it("should beable to handle thousands of billions", function(){
      assert.equal(to_vietnamese(1230950880055,'đồng'),"một nghìn hai trăm ba mươi tỷ chín trăm năm mươi triệu tám trăm tám mươi nghìn không trăm năm mươi lăm đồng")
   })
})