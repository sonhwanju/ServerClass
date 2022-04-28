let activeLoops = [];
const getLoopId = (function(){
    let staticLoopId = 0;
    return function(){
        return staticLoopId++;
    }
}
)();

module.exports.setGameLoop = function (update, tickLength = 1000/30) {
    let loopId = getLoopId();
    activeLoops.push(loopId);

    const longWaitMs = Math.floor(tickLength - 1);

    let frame = 0;
    let prev = process.hrtime();   // 이전 프레임 시각
    let target = process.hrtime(); // 다음프레임으로 예정되는 시각

    const gameLoop = function(){
        frame++;
        const now = process.hrtime();
        
        if(now>= target){
            const delta = now - prev; // 현재프레임과 이전 프레임의 걸린 시간
            prev = now;
            target = now + tickLength;

            update(delta);
        }
        if(activeLoops.indexOf(loopId) === -1){
            return;
        }

        const remainingTick = target - process.hrtime();
        if(remainingTick > longWaitMs){
            setTimeout(gameLoop, math.max(longWaitMs, 16));
        }else{
            setImmediate(gameLoop);
        }
    }

    //begin loop
    gameLoop();

    return loopId;
};

module.exports.clearGameLoop = function(loopId){
    activeLoops.splice(activeLoops.indexOf(loopId), 1);
};