
const loginHTML = `
<main class="login container">
    <h1 class="heading">Log in or signup</h1>
    <form class="form">
        <fieldset>
          <input class="block" type="email" name="email" placeholder="email">
        </fieldset>

        <fieldset>
          <input class="block" type="password" name="password" placeholder="password">
        </fieldset>

        <button type="button" id="login" class="">
          Log in
        </button>

        <button type="button" id="signup" class="">
          Sign up and log in
        </button>
      </form>
    </div>

</main>
`

const visHTML = `
<main>
    <header>
        <h1>My Data Feelings <small><a href="/admin">⚙︎</a></small><small id="logout" style="font-size:12px; margin-left:20px; cursor:pointer">logout</small></h1>
        <p>This is a series of daily visuals generated from my data feelings </p>
        
    </header>
      <!-- all of our sketches will be added here -->
      <section class="grid-container" id="vis-grid"></section>
</main>
`



const showLogin = function(error){
    if(document.querySelectorAll('.login').length) {
        document.querySelector('.heading').insertAdjacentHTML('beforeend', `<p>There was an error: ${error.message}</p>`);
    } else {
    document.getElementById('app').innerHTML = loginHTML;
    }
}

// Shows the chat page
const showViz = async function() {
    document.getElementById('app').innerHTML = visHTML;

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
  
      document.getElementById('app').innerHTML = loginHTML;
  
      break;
    }
    }
  });



// START EVERYTHING USING THE LOGIN FUNCTION  
login();






class MyFeelings {
    /**
     * 
    // anxiety: 5
    // contentment: 10
    // createdAt: "2019-02-03T21:00:59.347Z"
    // fitness: false
    // mood: "happy"
    // productivity: 9
    // stress: 6
     */
   
    constructor(_data){
        this.width = 160;
        this.height = 160;
        this.data = _data;
        this.render = this.render.bind(this);
    }

    render(sketch){
        // remember that the "this" keyword, won't be available do to scope 
        const w = this.width;
        const h = this.height;
        const data = this.data;
        const starWidth = 80

        sketch.setup = function() {
            sketch.createCanvas(w, h);
            sketch.noLoop();
        };

        sketch.draw = function() {
            if(data.fitness){
                sketch.background( 218, 247, 166 );
            }else{
                sketch.background(  247, 223, 241 );
            }
            

            sketch.push();
            sketch.translate(sketch.width/2, sketch.height/2);
            sketch.beginShape();
            sketch.noStroke();
            // anxiety
            // angle 0
            sketch.vertex(
                    sketch.cos(sketch.radians(0) )*sketch.map(data.anxiety, 1, 10, 1, starWidth), 
                    sketch.sin(sketch.radians(0) )*sketch.map(data.anxiety, 1, 10, 1, starWidth)
                    );

            // contentment
            sketch.vertex(
                    sketch.cos(sketch.radians(90) )*sketch.map(data.contentment, 1, 10, 1, starWidth), 
                    sketch.sin(sketch.radians(90) )*sketch.map(data.contentment, 1, 10, 1, starWidth)
                    );

            // productivity
            sketch.vertex(
                    sketch.cos(sketch.radians(180))*sketch.map(data.productivity, 1, 10, 1, starWidth), 
                    sketch.sin(sketch.radians(180))*sketch.map(data.productivity, 1, 10, 1, starWidth)
                    );

            // stress
            sketch.vertex(
                    sketch.cos(sketch.radians(270))*sketch.map(data.stress, 1, 10, 1, starWidth), 
                    sketch.sin(sketch.radians(270))*sketch.map(data.stress, 1, 10, 1, starWidth)
                    );
            

            sketch.endShape(sketch.CLOSE);

            sketch.stroke(0);
            sketch.line(-5, 0, 5, 0)
            sketch.line(0, -5, 0, 5)
            sketch.pop();

        };
    }

}
