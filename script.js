/* eslint-disable no-undef */
$( document ).ready( function() {
    let result = 0;

    function congradulations() {
        $( "html" ).hide();
    };

    function allButtonsReset( order ) {
        $( "button" ).addClass( "unpressed" );
        $( "button" ).removeClass( "pressed" );
        $( "button" ).removeClass( "uncorrectPressed" );
        $( "#check" ).prop( "disabled", true );
        $( "#check" ).removeClass( "checkError" );
        $( "#check" ).removeClass( "unlock" );
        $( "#check" ).addClass( "lock" );
        if ( order === "NotAll" ) {
            $( "#tip" ).text( "Это не все правильные ответы" );
            $( "#tip" ).css( "opacity", "1" );
          } else {
            $( "#tip" ).text( "Вычисли x" );
            $( "#tip" ).css( "opacity", "1" );
          }
          result = 0;
    };

    function checkState() {
        if ( result === 0 ) {
            $( "#check" ).addClass( "lock" );
            $( "#check" ).removeClass( "unlock" );
            $( "#check" ).prop( "disabled", true );
        } else {
            $( "#check" ).addClass( "unlock" );
            $( "#check" ).removeClass( "lock" );
            $( "#check" ).removeAttr( "disabled" );
        }
    };

    $( "button" ).click( function() {
        $( this ).toggleClass( "unpressed" );
        $( this ).toggleClass( "pressed" );
        if ( $( this ).hasClass( "pressed" ) && $( this ).hasClass( "correct" ) ) {
            result += 1;
        }
        if ( $( this ).hasClass( "unpressed" ) && $( this ).hasClass( "correct" ) ) {
            result -= 1;
        }
        if ( $( this ).hasClass( "pressed" ) && $( this ).hasClass( "uncorrect" ) ) {
            result -= 3;
        }
        if ( $( this ).hasClass( "unpressed" ) && $( this ).hasClass( "uncorrect" ) ) {
            result += 3;
        }
        checkState();
    } );

    $( "#check" ).click( function() {
        if ( result === 2 ) {
            $( "#tip" ).css( "opacity", "0" );
            $( this ).addClass( "checkPassed" );
            setTimeout( congradulations, 1500 );
        } else if ( result === 1 ) {
            $( this ).addClass( "checkError" );
            setTimeout( allButtonsReset, 1000, "NotAll" );
        } else {
            if ( $( ".uncorrect" ).hasClass( "pressed" ) ) {
                $( ".uncorrect.pressed" ).addClass( "uncorrectPressed" );
                $( ".uncorrect.pressed" ).removeClass( "pressed" );
            }
            $( this ).addClass( "checkError" );
            setTimeout( allButtonsReset, 1000, "errAns" );
        }
    } );
} );
