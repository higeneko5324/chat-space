$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="chat-main__message__list">
            <div class="chat-main__message__list__name">
              ${message.user_name}
              <div class="chat-main__message__list__name__days">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__message__list__comm">
              <p class="chat-main__message__comm__content">
                ${message.content}
              </p>
            </div>
              <img src=${message.image} >
            </div>
        </div>`
        
    } else {
        var html =
        `<div class="chat-main__message__list">
            <div class="chat-main__message__list__name">
              ${message.user_name}  
              <div class="chat-main__message__list__name__days">
                ${message.created_at}
              </div>
            </div>
            <div class="chat-main__message__list__comm">
              <p class="chat-main__message__comm__content">
                ${message.content}
              </p>
            </div>
        </div>`
    };
    return html;
   }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__message').append(html);
        $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
        $('form')[0].reset();
        $('.chat-main__form__send__btn').prop('disabled', false);
      })

      .fail(function(){
        alert("メッセージ送信に失敗しました");
      })
    
  });  
});