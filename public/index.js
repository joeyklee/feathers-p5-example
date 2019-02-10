const views = new Views();


function setup(){
    noCanvas();
    noLoop()
}

const showLogin = function(error){
    if(document.querySelectorAll('.login').length) {
        document.querySelector('.heading').insertAdjacentHTML('beforeend', `<p>There was an error: ${error.message}</p>`);
    } else {
    document.getElementById('app').innerHTML = views.loginHTML;
    }
}

const submitFeelings = async function(e){
    try {
        e.preventDefault();
        console.log("submitted!")
        const myForm = new FormData(document.querySelector("#moodForm"));
        const payload = {
            anxiety: myForm.get('anxiety'),
            contentment: myForm.get('contentment'),
            fitness: myForm.get('fitness'),
            mood: myForm.get('mood'),
            productivity: myForm.get('productivity'),
            stress: myForm.get('stress')
        }
        await client.authenticate();
        let newData = await feelings.create(payload);
        await showViz();

    } catch(error){

    }
}


const showAdmin = async function(){
    document.getElementById('app').innerHTML = views.adminHTML;

    moodForm.addEventListener('submit', submitFeelings)

}


// Shows the chat page
const showViz = async function() {
    document.getElementById('app').innerHTML = views.visHTML;

    let dataFeelings = await client.service('feelings').find({
      query: {
        $sort: { createdAt: -1 },
        $limit: false,

      }
    });
    

    dataFeelings.data.forEach( (item, idx) => {
        let newSketch = new MyFeelings(item);
        // vis.addTo('grid-vis');
        // let newDiv = createDiv()
        let newDiv = document.createElement("div"); 
        let divId = `vis-${idx}`
        // newDiv.parent('vis-grid');
        document.querySelector("#vis-grid").appendChild(newDiv);
        // newDiv.class('grid-item');
        newDiv.classList.add('grid-item')
        newDiv.id = divId;
        newDiv.innerHTML = `<small style="font-size:9px">${item.createdAt}</small><br><small style="font-size:9px">${item.mood}</small>`
        new p5(newSketch.render, divId);
        
    })

    
  };

// Retrieve email/password object from the login/signup page
const getCredentials = () => {
    const user = {
      email: document.querySelector('[name="email"]').value,
      password: document.querySelector('[name="password"]').value
    };
  
    return user;
  };

// Log in either using the given email/password or the token from storage
const login = async function(credentials){
    try {
        if(!credentials) {
          // Try to authenticate using the JWT from localStorage
          await client.authenticate();
        } else {
          // If we get login information, add the strategy we want to use for login
          const payload = Object.assign({ strategy: 'local' }, credentials);
          await client.authenticate(payload);
        }
    
        // If successful, show the chat page
        showViz();
      } catch(error) {
        // If we got an error, show the login page
        showLogin(error);
      }
}


document.addEventListener('click', async ev => {
    switch(ev.target.id) {
    case 'signup': {
      // For signup, create a new user and then log them in
      const credentials = getCredentials();
  
      // First create the user
      await client.service('users').create(credentials, {
        headers: { 'X-Requested-With': 'FeathersJS' }
      });
      // If successful log them in
      await login(credentials);
  
      break;
    }
    case 'login': {
      const user = getCredentials();
  
      await login(user);
  
      break;
    }
    case 'logout': {
      await client.logout();
  
      document.getElementById('app').innerHTML = views.loginHTML;
  
      break;
    }
    case 'admin': {    
        await showAdmin();
        break;
    }
    case 'submitFeelings': {  
        await submitFeelings();
        
        break;
    }
    case 'vis': {  
        
        await client.authenticate();
        await showViz();
        break;
    }

    }
  });



// START EVERYTHING USING THE LOGIN FUNCTION  
login();
