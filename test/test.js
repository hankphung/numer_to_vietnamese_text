var assert = require('assert');
var to_vietnamese = require('../src/n2vi');
describe('Number to Vietnamese text', function() {
   it("should convert up to hungreds of billion ", function() {
      assert.equal(to_vietnamese(120020120100),'một trăm hai mươi tỉ không trăm hai mươi triệu một trăm hai mươi nghìn một trăm')
   })
   it("should convert 1 to 9",function(){
      assert.equal(to_vietnamese(12345678900),"mười hai tỉ ba trăm bốn mươi lăm triệu sáu trăm bảy mươi tám nghìn chín trăm")
   })
   it("should flexible in 05 and 21",function(){
    assert.equal(to_vietnamese(105000),"một trăm lẻ năm nghìn");
    assert.equal(to_vietnamese(21000),"hai mươi mốt nghìn");
   });
    it("should add currency",function(){
    assert.equal(to_vietnamese(21000,'đồng'),"hai mươi mốt nghìn đồng")
    });
})