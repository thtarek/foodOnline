import datetime

def generate_order_number(pk):
    current_date = datetime.datetime.now().strftime('%Y%m%d%H%M%S')  #20220616233810 + pk
    order_number = current_date + str(pk)
    return order_number