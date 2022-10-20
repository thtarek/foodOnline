let autocomplete;

function initAutoComplete(){
autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('id_address'),
    {
        types: ['geocode', 'establishment'],
        //default in this app is "IN" - add your country code
        componentRestrictions: {'country': ['bd',]},
    })
// function to specify what should happen when the prediction is clicked
autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged (){
    var place = autocomplete.getPlace();

    // User did not select the prediction. Reset the input field or alert()
    if (!place.geometry){
        document.getElementById('id_address').placeholder = "Start typing...";
    }
    else{
        console.log('place name=>', place.name)
    }
    // get the address components and assign them to the fields
    // console.log(place)
}

$(document).ready(function(){
    // add to cart
    $('.add_to_cart').on('click', function(e){
        e.preventDefault();
        food_id = $(this).attr('data-id');
        url = $(this).attr('data-url');

        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                if(response.status == 'login_required'){
                    swal(response.message, "", "info").then(function(){
                        window.location = '/accounts/login';
                    })
                }else if(response.status == 'Failed'){
                    swal(response.message, "", "error")
                }else{
                    $('#cart-counter').html(response.cart_counter['cart_count'])
                    $('#qty-'+food_id).html(response.qty)
                }
            }
        })
    })

    // place the cart item quantity on load
    $('.item_qty').each(function(){
        var the_id = $(this).attr('id')
        var qty = $(this).attr('data-qty')
        $('#'+the_id).html(qty)
    })

    // decrease cart
    $('.decrease_cart').on('click', function(e){
        e.preventDefault();
        food_id = $(this).attr('data-id');
        url = $(this).attr('data-url');
        

        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                if(response.status == 'login_required'){
                    swal(response.message, "", "info").then(function(){
                        window.location = '/accounts/login';
                    })
                }else if(response.status == 'Failed'){
                    swal(response.message, "", "error")
                }
                else{
                    $('#cart-counter').html(response.cart_counter['cart_count'])
                    $('#qty-'+food_id).html(response.qty)
                }
            }
        })
    })

    // delete cart item
    $('.delete_cart_item').on('click', function(e){
        e.preventDefault();
        // alert('ok')
        // return false
        cart_id = $(this).attr('data-id');
        url = $(this).attr('data-url');
        

        $.ajax({
            type: 'GET',
            url: url,
            success: function(response){
                if(response.status == 'Failed'){
                    swal(response.message, "", "error")
                }
                else{
                    $('#cart-counter').html(response.cart_counter['cart_count'])
                    swal(response.status, response.message,'success')
                    removeCartItem(0, cart_id)
                    checkEmptyCart()
                }
            }
        })
    })
    // delete the cart element if the qty is 0
    function removeCartItem(cartItemQty, cart_id){
        if(cartItemQty <= 0){
            document.getElementById('cart-item-'+cart_id).remove()
        }
    }

    // check cart is empty?
    function checkEmptyCart(){
        var cart_counter = document.getElementById('cart-counter').innerHTML
        if(cart_counter == 0){
            document.getElementById('empty-cart').style.display = 'block'
        }
    }
})
