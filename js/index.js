const PAGE = {
  data: {
    url: 'https://www.jevescript.com/api/task/mobile',
    phone: null,
  },
  init: function(){
    this.bind();
  },
  bind: function(){
    $('#apply-btn').on('click',this.judge);
    $('#apply-section').on('keyup','#num-input',this.clean);
  },
  judge: function(){
    let value = $('#num-input').val().trim();
    let result = PAGE.isPhoneNumber(value);
    if(result){
      PAGE.data.phone = value;
      PAGE.postTel();
    }else{
      PAGE.falseResult();
    }
  },
  isPhoneNumber: function(tel) {
    var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(tel);
  },
  falseResult: function(){
    $('#false-num').css('display','block');
  },
  postTel: function(){
    let phone = PAGE.data.phone;
    axios.post(PAGE.data.url, {phone})
    .then(res => {
      if(res.data.code === 200){
        $('#page').css('display','none');
        $('#success-page').css('display','block');
      }
    })
  },
  clean: function(){
    $('#false-num').css('display','none');
  }
}
PAGE.init();