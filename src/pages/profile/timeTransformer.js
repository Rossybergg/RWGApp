export const lastSeen = (startTime, endTime) => {
    const timeNow = Date.now();
    const formattedTime = new Date(endTime)
    let diff = (formattedTime - timeNow)/1000;
    diff = Math.abs(Math.floor(diff));

    const days = Math.floor(diff/(24*60*60));
    let leftSec = diff - days * 24*60*60;
    const hrs = Math.floor(leftSec/(60*60));
    leftSec = leftSec - hrs * 60*60;
    const min = Math.floor(leftSec/(60));
    leftSec = leftSec - min * 60;

    if (isNaN(days) || isNaN(hrs) || isNaN(min)) {
        return 'Never';
    }

    if(startTime > endTime) {
        return 'Online Now'
    }

    if (days !== 0) {
        return `${days} Days Ago`;
    }

    if (days === 0 && hrs !== 0) {
        return `${hrs} Hours Ago`;
    }

    if (days === 0 & hrs === 0 & min !== 0) {
        return `${min} Minutes Ago`;
    }

    return `${days} Days, ${hrs} Hours, ${min} Mins ago`;
}

export const formatVoiceTime = (time) => {
    const voiceTimeSeconds = (new Date(time) * 60);
    const d = Math.floor(voiceTimeSeconds / (3600 * 24));
    const h = Math.floor(voiceTimeSeconds % (3600 * 24) / 3600);
    const m = Math.floor(voiceTimeSeconds % 3600 / 60);
    return `${d}D ${h}H ${m}M`
}

export const getKD = (wins, loses) => {
    let duelKd = (Number(wins) / Number(loses));
    if( isNaN(duelKd)) {
        return 0;
    }
    return duelKd.toString().substring(0, 4);
}