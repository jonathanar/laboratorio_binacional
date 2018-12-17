var mxCustomProblem = (function() {

    route = document.getElementById('resroute').value;

    form = document.createElement('form');
    form.id = "formcursoste";
    form.method = "POST";
    form.action = "http://idea-itesm.com/mexicox/plantillas/php/registry.php";
    in1 = document.createElement('input');
    in1.type = "text";
    in1.name = "usercontest";
    in1.id = "usercontest";
    in2 = document.createElement('input');
    in2.type = "text";
    in2.name = "useremailcontest";
    in2.id = "useremailcontest";
    in3 = document.createElement('input');
    in3.type = "text";
    in3.name = "usertrynumbercontest";
    in3.id = "usertrynumbercontest";
    in4 = document.createElement('input');
    in4.type = "text";
    in4.name = "timecontest";
    in4.id = "timecontest";
    in5 = document.createElement('input');
    in5.type = "text";
    in5.name = "routeresults";
    in5.id = "routeresults";
    form.appendChild(in1);
    form.appendChild(in2);
    form.appendChild(in3);
    form.appendChild(in4);
    form.appendChild(in5);
    document.body.appendChild(form);

    cokie = window.location.search;
    cokie = cokie.replace(/\\054/g, ',');
    cokie = cokie.replace(/\\/g, '');
	cokie = cokie.replace(/\%22/g, '"');
	cokie = cokie.replace(/\%20/g, ' ');
    cokie = cokie.substring(cokie.indexOf('edx-user-info')+15, cokie.indexOf('}"')+1);
    cokie = JSON.parse(cokie);

    user = cokie.username;
    email = cokie.email;

    time = 0;

    counter = setInterval(function(){
        countInit();
    }, 1000);

    var state = {
            'option': '',
            'correct': false,
            'try_number': 0
        }, channel;

    // Establish a channel only if this application is embedded in an iframe.
    // This will let the parent window communicate with this application using
    // RPC and bypass SOP restrictions.
    if (window.parent !== window) {
        channel = Channel.build({
            window: window.parent,
            origin: "*",
            scope: "JSInput"
        });

        channel.bind("getGrade", getGrade);
        channel.bind("getState", getState);
        channel.bind("setState", setState);
    }

    function change() {
        var radios = document.getElementsByName('option');
        if(state.try_number == 0 || state.correct == "false"){
            for(var i = 0, length = radios.length; i < length; i++){
                if(radios[i].checked){
                    state.correct = radios[i].value;
                    state.option = i;
                    state.try_number = state.try_number + 1;
                    if(state.correct == "true"){
                        updateForm();
                        form.submit();
                    }
                    break;
                }
            }
        }
    }

    function updateForm() {
        if(typeof(state.correct) && typeof(state.try_number) && typeof(user) && typeof(email)){
            document.getElementById('usercontest').value = user;
            document.getElementById('useremailcontest').value = email;
            document.getElementById('usertrynumbercontest').value = state.try_number;
            document.getElementById('timecontest').value = time;
            document.getElementById('routeresults').value = route;
			console.log(document.getElementById('usercontest').value);
			console.log(document.getElementById('useremailcontest').value);
			console.log(document.getElementById('usertrynumbercontest').value);
			console.log(document.getElementById('timecontest').value);
			console.log(document.getElementById('routeresults').value);
        }
    }

    function setInit() {
        updateForm();
        if(state.option != '' || state.option == 0){
            var radios = document.getElementsByName('option');
            radios[state.option].checked = true;
        }
        updateColor();
    }

    function countInit() {
        time = time + 1;
    }

    function updateColor() {
        var radios = document.getElementsByName('option');
        for (var i = 0, length = radios.length; i < length; i++) {
            radios[i].className = "";
            if(radios[i].checked){
                feed = "";
                feed = document.getElementsByClassName('feedback')[i].innerHTML;
                if(radios[i].value == "true"){
                    clearInterval(counter);
                    radios[i].parentElement.className = "correct";
                    if(feed != ""){
                        document.getElementById('feedbk').innerHTML = "<b>Correcto:</b> " + feed;
                        document.getElementById('feedbk').className = "feedcorrect";
                    }
                }else{
                    radios[i].parentElement.className = "incorrect";
                    if(feed != ""){
                        document.getElementById('feedbk').innerHTML = "<b>Incorrecto:</b> " + feed;
                        document.getElementById('feedbk').className = "feedincorrect";
                    }                    
                }
            }
        }
    }

    function getGrade() {
        // The following return value may or may not be used to grade
        // server-side.
        // If getState and setState are used, then the Python grader also gets
        // access to the return value of getState and can choose it instead to
        // grade.
        change();
        return JSON.stringify(state);
    }

    function getState() {
        return JSON.stringify(state);
    }

    // This function will be called with 1 argument when JSChannel is not used,
    // 2 otherwise. In the latter case, the first argument is a transaction
    // object that will not be used here
    // (see http://mozilla.github.io/jschannel/docs/)
    function setState() {
        stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
        state = JSON.parse(stateStr);
        setInit();
    }

    return {
        getState: getState,
        setState: setState,
        getGrade: getGrade
    };
}());

































