// Simplified Analog Brush Strokes
console.log('Loading brush strokes...');

class SimpleBrushCanvas {
    constructor() {
        // Only on desktop
        if (window.innerWidth <= 768) {
            console.log('Mobile detected - no brush strokes');
            return;
        }
        
        this.canvas = null;
        this.ctx = null;
        this.strokes = [];
        this.colors = ['#4e9af1', '#f34e8a', '#ffc95e', '#7cf1aa'];
        this.lastStrokeTime = 0;
        
        this.init();
    }
    
    init() {
        // Wait for page to be ready
        setTimeout(() => {
            this.createCanvas();
            if (this.canvas) {
                this.startDrawing();
                console.log('Brush strokes initialized');
            }
        }, 3000); // Wait 3s to avoid hero lag
    }
    
    createCanvas() {
        const gallery = document.getElementById('gallery-section');
        if (!gallery) {
            console.error('Gallery section not found');
            return;
        }
        
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'brushCanvas';
        this.ctx = this.canvas.getContext('2d');
        
        // Style canvas
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        
        // Add to gallery
        gallery.appendChild(this.canvas);
        this.setupCanvas();
        
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    setupCanvas() {
        const gallery = document.getElementById('gallery-section');
        if (!gallery || !this.canvas) return;
        
        const rect = gallery.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.ctx.lineCap = 'round';
    }
    
    createStroke() {
        const gallery = document.getElementById('gallery-section');
        if (!gallery) return null;
        
        const rect = gallery.getBoundingClientRect();
        console.log('Gallery dimensions:', rect.width, 'x', rect.height);
        
        // Calculate side areas (simple version)
        const galleryContentWidth = 900;
        const sideMargin = (rect.width - galleryContentWidth) / 2;
        
        console.log('Side margin:', sideMargin);
        
        if (sideMargin < 100) {
            console.log('Not enough side space for strokes');
            return null;
        }
        
        // Choose left or right side
        const isLeft = Math.random() < 0.5;
        const x = isLeft 
            ? 50 + Math.random() * (sideMargin - 100) // Left side
            : rect.width - sideMargin + 50 + Math.random() * (sideMargin - 100); // Right side
            
        const y = 200 + Math.random() * (rect.height - 400); // Center area
        
        // Stroke properties
        const length = 150 + Math.random() * 100;
        const angle = (Math.random() - 0.5) * Math.PI;
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        
        console.log('Creating stroke at:', x, y, 'to', endX, endY);
        
        return {
            startX: x,
            startY: y,
            endX: endX,
            endY: endY,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            width: 8 + Math.random() * 8,
            opacity: 0.1 + Math.random() * 0.05,
            progress: 0,
            createdAt: Date.now(),
            duration: 1500, // 1.5s drawing
            fadeStart: 8000 // Start fade after 8s
        };
    }
    
    updateStroke(stroke, now) {
        const age = now - stroke.createdAt;
        
        if (age < stroke.duration) {
            // Drawing phase
            stroke.progress = Math.min(1, age / stroke.duration);
        } else if (age > stroke.fadeStart) {
            // Fading phase
            const fadeTime = age - stroke.fadeStart;
            stroke.opacity = Math.max(0, stroke.opacity * (1 - fadeTime / 5000));
        }
        
        return stroke.opacity > 0;
    }
    
    drawStroke(stroke) {
        if (!this.ctx || stroke.progress === 0) return;
        
        this.ctx.save();
        this.ctx.globalAlpha = stroke.opacity;
        this.ctx.strokeStyle = stroke.color;
        this.ctx.lineWidth = stroke.width;
        
        // Draw stroke progressively
        const currentX = stroke.startX + (stroke.endX - stroke.startX) * stroke.progress;
        const currentY = stroke.startY + (stroke.endY - stroke.startY) * stroke.progress;
        
        this.ctx.beginPath();
        this.ctx.moveTo(stroke.startX, stroke.startY);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    animate() {
        if (!this.ctx) return;
        
        const now = Date.now();
        
        // Update strokes
        this.strokes = this.strokes.filter(stroke => this.updateStroke(stroke, now));
        
        // Create new stroke every 7-12 seconds
        if (now - this.lastStrokeTime > 7000 + Math.random() * 5000) {
            const newStroke = this.createStroke();
            if (newStroke) {
                this.strokes.push(newStroke);
                this.lastStrokeTime = now;
                console.log('New stroke created, total strokes:', this.strokes.length);
            }
        }
        
        // Clear and redraw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.strokes.forEach(stroke => this.drawStroke(stroke));
        
        requestAnimationFrame(() => this.animate());
    }
    
    startDrawing() {
        console.log('Starting brush animation...');
        this.animate();
        
        // Create first stroke immediately for testing
        setTimeout(() => {
            const firstStroke = this.createStroke();
            if (firstStroke) {
                this.strokes.push(firstStroke);
                console.log('First test stroke created');
            }
        }, 1000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.brushCanvas = new SimpleBrushCanvas();
});

console.log('Brush strokes module loaded');