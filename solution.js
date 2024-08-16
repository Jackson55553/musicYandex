export function solution(player, platforms, audioContext, destination) {
    let { x, y, vx, vy, ax, ay } = player;

    const touched = platforms.find((el, index) => {
        const halfWidth = el.width / 2;
        const halfHeight = el.height / 2;

        const left = el.x - halfWidth;
        const right = el.x + halfWidth;
        const top = el.y + halfHeight;
        const bottom = el.y - halfHeight;

        return x >= left && x <= right && y <= top && y >= bottom;
    });
    if (touched) {
        const oscillator = new OscillatorNode(audioContext, {
            type: "triangle",
            frequency: touched.freq.toFixed(2),
        });
        oscillator.connect(destination);
        oscillator.start();

        setTimeout(() => {
            oscillator.stop();
        }, 250);

        vx = -vx;
        vy = -0.5 * vy;
        y = y - vy;
    }
    x += vx;
    y -= vy;
    vy = vy - ay;

    return { x, y, vx, vy, ax, ay };
}
