/**
 * Convert from number to Vietnamese string.
 * By Dong Hung Phung <donghung.viethanit@gmail.com>
 */
(function(){
  var default_numbers=' hai ba bốn năm sáu bảy tám chín';
  var dict = {
    units: ('? một'+ default_numbers).split(' '),
    tens: ('lẻ mười'+default_numbers).split(' '),
    hundreds: ('không một'+default_numbers).split(' '),
  }
  const tram = 'trăm';
  var digits='x nghìn triệu tỉ nghìn'.split(' ');

  /**
   * additional words
   * @param  {string} block_of_2 [description]
   * @return {string}   [description]
   */
  function tenth(block_of_2)
  {
    var sl1=dict.units[block_of_2[1]] ;
    var result = [dict.tens[block_of_2[0]]]
    if(block_of_2[0] > 0 && block_of_2[1] == 5)
      sl1='lăm';
    if(block_of_2[0]>1)
    {
      result.push('mươi');
      if(block_of_2[1]==1)
        sl1='mốt';
    }
    if(sl1!='?') result.push(sl1);
    return result.join(' ');
  }

  /**
   * convert number in blocks of 3
   * @param  {string} block "block of 3 mumbers"
   * @return {string}   [description]
   */
  function block_of_three(block)
  {

    switch(block.length)
    {
      case 1:
        return dict.units[block] ;

      case 2:
        return tenth(block);

      case 3:
        var result = [dict.hundreds[block[0]], tram];
        if(block.slice(1,3)!='00'){
          var sl12 = tenth(block.slice(1,3));
          result.push(sl12);
        }
        return result.join(' ');
    }
    return '';
  }
  /**
   * Get number from unit, to string
   * @param  {mixed} nStr input money
   * @return {String}  money string, removed digits
   */
  function formatnumber(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  };

  function digit_counting(i, digit_counter){
    var result = digits[i]

    return result
  }
  function to_vietnamese(input, currency) {
    var str = parseInt(input) + '';
    var index = str.length;
    if(index==0||str=='NaN' )
      return '';
    var i=0;
    var arr=[];
    var result=[]

    //explode number string into blocks of 3numbers and push to queue
    while (index>=0) {
      arr.push(str.substring(index, Math.max(index-3,0)));
      index-=3;
    }
    //loop though queue and convert each block
    var digit_counter = 0;
    var digit;
    var adding;
    for(i=arr.length-1; i>=0; i--)
    {
      if(arr[i] == '000')
      {
        digit_counter+=1;
        if(i == 2 && digit_counter == 2){
          result.push(digit_counting(i+1,digit_counter));
        }
      }
      else if(arr[i]!=''){
        digit_counter = 0
        result.push(block_of_three(arr[i]))
        digit = digit_counting(i,digit_counter);
        if(digit && digit != 'x')  result.push(digit);
      }
    }
    if(currency)
      result.push(currency);
    //remove unwanted white space
    return result.join(' ')
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = to_vietnamese;
  }
  else  if(typeof window !== undefined){
    window.to_vietnamese = to_vietnamese;
  }
  return to_vietnamese
})();