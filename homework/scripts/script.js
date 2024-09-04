$(function(){
    // randomizer
    function randomizer(){
        let check = true;
        let num = new Set();
        num.add($('.blocks__puzzle')[Math.floor(Math.random() * 16)]);
        console.log(num.size)
        while(check){
            if(num.size == 16){
                check = false;
            }
            let n = $('.blocks__puzzle')[Math.floor(Math.random() * 16)];
            console.log(num)
            num.add(n);
        }
        $('.blocks__left').html('');
        num = Array.from(num);
        for(let i = 0; i < num.length; i++){
            $('.blocks__left').append(num[i]);
        }
    }
    randomizer();
    // timer
    let intervalTimer;
    let intervalChecker;
    let checkerMessage = false;
    function timer(){
        setTimeout(function(){
            $('.timer__minutes').text(`00`);
            $('.timer__seconds').text(`59`);
            intervalTimer = setInterval(function(){
                $('.timer__seconds').text(`${$('.timer__seconds').text() - 1}`);
                if(+$('.timer__seconds').text() < 10){
                    $('.timer__seconds').text(`0${$('.timer__seconds').text()}`);
                }
                if($('.timer__seconds').text() === '00'){
                    checkerMessage = true;
                    clearInterval(intervalTimer);
                    $('#closeText').text(`It's a pity, but you lost`);
                    $('.message-bg').fadeIn();
                    $('#checkButton').prop('disabled', true);
                }
            }, 1000)
        }, 1000)
        
    }
    // sortable
    let checkerButtonDis = 0;
    $('.blocks__small').sortable({
        connectWith: '.blocks__small',
        start: function(){
            checkerButtonDis++;
            if(checkerButtonDis === 1){
                $('#startButton').prop('disabled', true);
                $('#checkButton').prop('disabled', false);
                timer();
            }
        },
    });
    // start
    $('#startButton').click(function(){
        checkerButtonDis = 2;
        $('#startButton').prop('disabled', true);
        $('#checkButton').prop('disabled', false);
        timer();
    })
    // close
    $('#messageButton').click(function(){
        $('.message-bg').fadeOut();
        setTimeout(function(){
            $('#closeText').text(`It's a pity, but you lost`);
            $('#messageButtonCheck').hide();
            clearInterval(intervalChecker); //                              here
        }, 500)
        
    });

    // check
    $('#checkButton').click(function(){
        $('.message-bg').fadeIn();
        $('#messageButtonCheck').show();
        $('#messageButtonCheck').prop('disabled', false);
        intervalChecker = setInterval(function(){
            $('#closeText').text(`You still have time, you sure?00:${$('.timer__seconds').text()}`);
            if(checkerMessage){
                $('#closeText').text(`It's a pity, but you lost`);
                $('#messageButtonCheck').hide();
            }
        } ,300)
    })
    $('#messageButtonCheck').click(function(){
        let counterCheck = 0;
        for(let i = 0; i < 16; i++){
            if($('.blocks__right .blocks__puzzle').eq(i).hasClass(`blocks__puzzle-${i+1}`)){
                counterCheck++;
            }
        }
        if(counterCheck === 16){
            clearInterval(intervalTimer);
            clearInterval(intervalChecker);
            $('#messageButtonCheck').prop('disabled', true);
            $('#checkButton').prop('disabled', true);
            $('#closeText').text(`Woohoo, well done, you did it!`);
        }
        else{
            clearInterval(intervalTimer);
            clearInterval(intervalChecker);
            $('#messageButtonCheck').prop('disabled', true);
            $('#checkButton').prop('disabled', true);
            $('#closeText').text(`It's a pity, but you lost`);
        }
    });
    // button newGame
    $('#newGame').click(function(){
        randomizer();
        $('.timer__minute').text(`01`);
        $('.timer__seconds').text(`00`);
        $('#startButton').prop('disabled', false);
        $('#checkButton').prop('disabled', true);
        clearInterval(intervalTimer);
        clearInterval(intervalChecker);
        checkerButtonDis = 0;
        checkerMessage = false;
    });
})