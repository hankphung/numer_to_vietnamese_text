describe('Number to Vietnamese text', function() {
   it("should convert up to hungreds of billion ", function() {
    expect(to_vietnamese(120020120100)).toBe('một trăm hai mươi tỉ không trăm hai mươi triệu một trăm hai mươi nghìn một trăm')
   })
   it("should convert 1 to 9",function(){
      expect(to_vietnamese(12345678900)).toBe("mười hai tỉ ba trăm bốn mươi lăm triệu sáu trăm bảy mươi tám nghìn chín trăm")
   })
   it("should flexible in 05 and 21",function(){
    expect(to_vietnamese(105000)).toBe("một trăm lẻ năm nghìn");
    expect(to_vietnamese(21000)).toBe("hai mươi mốt nghìn");
   });
    it("should add currency",function(){
    expect(to_vietnamese(21000,'đồng')).toBe("hai mươi mốt nghìn đồng")
    });
})