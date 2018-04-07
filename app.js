$('#selectTab').on('change',function() {
    var state = this.value;
    console.log(state);
    population(state);
    employment(state);
    income(state);
    college(state);

});