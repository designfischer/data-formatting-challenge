const minutes = [0, 1, 30, 60, 60*6, 23*60, 24*60]    

const sessionStartedAt = new Date().getTime()

const minutesInMS = minutes.map(convertMinutesToMS)

minutesInMS.map(time_in_MS => createHTMLelement(time_in_MS))         

function createHTMLelement(initial_time) {  
            
    const timeInterval = 1000              
    const initialTime = Number(initial_time)         
    const className = createSpanClassName(initial_time)         

    let div = document.createElement('div')
        div.innerHTML = 'Started '

    let span = document.createElement('span')
        span.className = `js-date-format ${className}`           
        span.innerHTML = formatTime(initialTime)

        div.appendChild(span)
        document.body.appendChild(div)              

    setInterval(updateHTMLelement, timeInterval, className, initialTime, sessionStartedAt)           

}   
        
function updateHTMLelement(class_name, initial_time, session_started_at) {   
            
    const className = String(class_name)
    const initialTime = Number(initial_time)
    const sessionStartedAt = Number(session_started_at)
            
    const getCurrentTimeInMS = new Date().getTime()

    const timeElapsed = getCurrentTimeInMS - (sessionStartedAt - initialTime)

    const span = document.querySelector(`.${className}`)
    span.innerHTML = formatTime(timeElapsed)

}

function formatTime(time_in_MS) {

    const timeInMS = Number(time_in_MS)
    const seconds = (timeInMS/1000).toFixed(0)

    if (seconds <= 1) {

        return seconds + ' second ago'

    } else if (seconds < 60) {

        return seconds + ' seconds ago'

    } else if ( seconds < 60 * 2) {

        const minute = Math.floor(seconds / 60)                
        return minute + ' minute ago'

    } else if ( seconds < 60 * 60 ) {

        const minutes = Math.floor(seconds / 60)
        return minutes + ' minutes ago'

    } else if ( seconds < 60 * 60 * 2 ) {

        const hour = Math.floor(seconds / (60 * 60))
        return hour + ' hour ago'

    } else if ( seconds < 60*60*24) {

        const hours = Math.floor(seconds / (60 * 60))
        return hours + ' hours ago'

    } else {

        const currentDate = new Date().getTime()
        const date = currentDate - (seconds * 1000)
        return new Date(date).toISOString() 

    }
}

function convertMinutesToMS(time_in_minutes) {

    const timeInMinutes = Number(time_in_minutes)

    const timeInMS = timeInMinutes * 1000 * 60
    return timeInMS

}

function createSpanClassName(value) {

    const spanClassName = 'span' + String(value) 
    return spanClassName

}