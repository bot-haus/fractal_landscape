let myp5;

window.onload = function() {
    let sketch = function(p) {
        let yoff;  

        p.setup = function() {
            let canvas = p.createCanvas(710, 400, p.SVG);
            canvas.parent('canvasContainer');
            p.background(255);
            p.noLoop();
        };

        p.draw = function() {
            const lines = parseInt(document.getElementById('lines').value, 10);
            const segments = parseInt(document.getElementById('segments').value, 10);
            const amplification = parseFloat(document.getElementById('amplification').value);
            const octaves = 4;  // The number of "layers" of noise
            const persistence = 0.5;  // The decrease in amplitude of each subsequent layer

            p.background(255);
            yoff = 0.0;

            p.stroke(0);
            p.noFill();

            for (let y = 0; y < lines; y++) {
                p.beginShape();
                let xoff = 0;
                for (let x = 0; x < segments; x++) {
                    let xMapped = p.map(x, 0, segments, 0, p.width);
                    
                    let total = 0;  // The accumulation of noise at each layer
                    let frequency = 1;  // Frequency of the noise
                    let amplitude = 1;  // Amplitude of the noise
                    let maxValue = 0;  // Used for normalizing the result to 0.0 - 1.0

                    // Sum of noise layers
                    for(let i=0; i<octaves; i++) {
                        total += p.noise(xoff * frequency, yoff * frequency) * amplitude;
                        
                        maxValue += amplitude;
                        
                        amplitude *= persistence;
                        frequency *= 2;
                    }
                    
                    // Normalization
                    total /= maxValue;

                    let yMapped = p.map(total, 0, 1, -p.height / (2 * lines), p.height / (2 * lines)) * amplification;
                    p.vertex(xMapped, y * (p.height / lines) + yMapped);
                    xoff += 0.05;
                }
                yoff += 0.01;
                p.endShape();
            }
        };

        p.keyPressed = function() {
            if (p.keyCode === 83) {
                p.save("fractal_noise_landscape.svg");
            }
        };
    };

    myp5 = new p5(sketch);
};
