

var helper={
    getOrderNotesVisibility:(orderResult)=>{
        if(!orderResult.notes) return 'hide';
        else return '';
    },
    promoCodes:(data)=>{
        if(data.discount){
            var promotion={};
            var codes='';
            var items=data.discountItems;
            var length=items.length;
            var max=length-1;
            for(var i=0;i<length;i++){
                codes+=items[i].code;
                if(i<max) codes +=', ';
            }
            promotion.codes=codes;
            return promotion;
        }else return null;
    },
    getUserType:(data)=>{
        if(data.isAuthenticatedUser) return 'Registered User';
        else return 'Anonymous User';
    },
    getAddress:(address)=>{
        return address.street + ", " + address.city + ", " + address.state + " " + address.zipCode;
    }
};

export default helper;
