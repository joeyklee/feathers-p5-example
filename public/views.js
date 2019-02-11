class Views {
  constructor() {

    this.loginHTML = `
    <main class="login container">
        <section>
            <h1>My Data Feelings Log</h1>
            <p>A generative data visualization of my feelings submitted every day.</p>
        </section>
        <section>
        <h2 class="heading">Log in or signup</h2>
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
        <section>
    
    </main>
    `

    this.visHTML = `
    <main>
        <header>
            <h1>My Data Feelings <small class="btn" id="admin">⚙︎</small><small id="logout"  class="btn" style="font-size:12px; margin-left:20px; cursor:pointer">logout</small></h1>
            <p>This is a series of daily visuals generated from my data feelings </p>
            
        </header>
          <!-- all of our sketches will be added here -->
          <section class="grid-container" id="vis-grid"></section>
    </main>
    `

    this.adminHTML = `
        <main>
        <header>
            <h1>Data Feelings Admin Console</h1>
            <p>Use the various inputs to submit data about your mood</p>
            <small class="btn" style="text-decoration:underline" id="vis">🔙 back to viz</small>
        </header>
        <section class="grid-container">
        
          <div class="" id="myControls">
            <form id="moodForm" onsubmit="submitFeelings()" method="post">
            <fieldset>
              <legend>mood</legend>
              <input type="text" id="mood-input" name="mood" placeholder="e.g. happy">
            </fieldset>
            <fieldset>
                <legend>Anxiety</legend>
                <input type="range" id="anxiety-input" name="anxiety" placeholder="e.g. happy" min="1" max="10">
                <span id="anxiety-input-label"></span>
            </fieldset>
            <fieldset>
                <legend>stress</legend>
                <input type="range" id="stress-input" name="stress" placeholder="e.g. happy" min="1" max="10">
                <span id="stress-input-label"></span>
            </fieldset>
            <fieldset>
                <legend>contentment</legend>
                <input type="range" id="contentment-input" name="contentment" placeholder="e.g. happy" min="1" max="10">
                <span id="contentment-input-label"></span>
            </fieldset>
            <fieldset>
                <legend>productivity</legend>
                <input type="range" id="productivity-input" name="productivity" placeholder="e.g. happy" min="1" max="10">
                <span id="productivity-input-label"></span>
            </fieldset>
            <fieldset>
                <legend>fitness today?</legend>
                <div>
                    <p>Yes 😍</p>
                    <input type="radio" id="fitness-input-yes" name="fitness" value="yes"> 
                </div>
                <div>
                <p>No 😭</p>
                <input type="radio" id="fitness-input-no" name="fitness" value="no" checked> 
                </div>
            </fieldset>
            <input id="submit-input" type="submit" value="Submit! 🚀">
          </form>
          </div>
          </section>
        </main>
    `
  }
}
