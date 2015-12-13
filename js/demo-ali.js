(function() {

    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;
    //var colors = ['41,62,106', '59,89,152', '116,170,247', '119,186,155', '182,167,84'];
    
    var colors = ['41,62,106', '59,89,152', '116,170,247', '119,186,155', '182,167,84', '225, 225, 225'];
    
    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('intro-banner');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width*0.01; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

      function getRandNum(min, max) {
       return Math.random() * (max - min) + min; 
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw(i);
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
            console.log(_this);
        })();

        function init() {
            num = Math.floor((Math.random() * 10) + 1);
            bubble_scale = Math.floor((Math.random() * 10) + 2);
            if (num % 2){
                _this.pos.x = 0;
                _this.velocity = Math.random()*2;
            }
            else{
                _this.pos.x = width;
                _this.velocity = Math.random()*-2;}
            // _this.pos.x = 0; //+ Math.random() * width;//getRandNum(width, height); //Math.random() * height;
            _this.pos.y = 0+Math.random()*width;
            _this.alpha = 0.1+Math.random()*0.5;
            // _this.scale = 0.1+Math.random()*0.3;
            // _this.velocity = Math.random()*2;
            _this.scale = 0.1+bubble_scale; //1+Math.random()*0.3; //size here0.1 + num;//
            _this.color = colors[Math.floor(Math.random()*colors.length)];
            setTimeout(function() { _this.alpha = 0.5; }, 10);
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            // if ()
            _this.pos.x += _this.velocity;
            // _this.pos.y += _this.velocity;
            _this.alpha += 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*100, 0, 2 * Math.PI, false); //or here 10-100
            // ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.fillStyle = 'rgba('+_this.color+','+ _this.alpha+')';
            ctx.fill();
        };
    }

})();