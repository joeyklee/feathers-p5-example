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
