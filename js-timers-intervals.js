/************************************                                                                
 * JAVASCRIPT TIMERS AND INTERVALS
 * A comprehensive guide with numbered examples
 * using modern arrow function syntax
 ************************************/

/// Example 1: Basic setTimeout
/// setTimeout executes a callback once after a specified delay
const example1 = () => {
    setTimeout(() => {
        console.log('⏰ Example 1: Basic timeout after 2 seconds');
    }, 2000); // 2000ms = 2 seconds
};

/// Example 2: Basic setInterval
/// setInterval repeatedly executes a callback at specified intervals
const example2 = () => {
    /************************************
     * @returns {number} intervalId - Use this to stop the interval
     * @note Remember to clear intervals to prevent memory leaks
     ************************************/
    const intervalId = setInterval(() => {
        console.log('🔁 Example 2: Running every second');
    }, 1000);
    return intervalId;
};

/// Example 3: Clearing Intervals and Timeouts
const example3 = () => {
    /**** Part A: Clear Interval ****/
    const intervalId = setInterval(() => {
        console.log('🔄 Running...');
    }, 1000);
    
    // Stop interval after 5 seconds
    setTimeout(() => {
        clearInterval(intervalId);
        console.log('⏹️ Example 3A: Interval stopped');
    }, 5000);

    /**** Part B: Clear Timeout ****/
    const timeoutId = setTimeout(() => {
        console.log('This will never run');
    }, 3000);
    
    clearTimeout(timeoutId);
    console.log('⏹️ Example 3B: Timeout cancelled');
};

/// Example 4: Zero Delay setTimeout
const example4 = () => {
    /************************************
     * Zero delay doesn't mean immediate execution
     * It schedules execution for the next event loop iteration
     ************************************/
    console.log('🎯 Example 4: Starting');
    
    setTimeout(() => {
        console.log('⚡ Example 4: This runs after current code');
    }, 0);
    
    console.log('🎯 Example 4: Ending');
};

/// Example 5: setTimeout with Parameters
const example5 = () => {
    /**** Method A: Using arrow function closure ****/
    const name = 'John';
    setTimeout(() => {
        console.log(`👋 Example 5A: Hello, ${name}!`);
    }, 1000);

    /**** Method B: Using additional parameters ****/
    setTimeout((user, greeting) => {
        console.log(`👋 Example 5B: ${greeting}, ${user}!`);
    }, 1000, 'Jane', 'Welcome');
};

/// Example 6: Dynamic Interval Timing
const example6 = () => {
    /************************************
     * This example demonstrates:
     * 1. Changing interval timing dynamically
     * 2. Self-stopping interval based on condition
     * 3. Tracking state between interval calls
     ************************************/
    let delay = 1000;
    let count = 0;

    const intervalId = setInterval(() => {
        count++;
        console.log(`⚡ Example 6: Run #${count} with ${delay}ms delay`);
        delay += 1000;
        
        if (count >= 5) {
            clearInterval(intervalId);
            console.log('🛑 Example 6: Interval stopped');
        }
    }, delay);
};

/// Example 7: Recursive setTimeout
const example7 = () => {
    /************************************
     * Benefits over setInterval:
     * 1. More precise timing
     * 2. Guaranteed completion of previous execution
     * 3. Dynamic intervals between executions
     ************************************/
    let count = 0;
    
    const recursiveDelay = () => {
        count++;
        console.log(`🎯 Example 7: Execution #${count}`);
        
        if (count < 5) {
            setTimeout(recursiveDelay, 1000);
        }
    };

    recursiveDelay();
};

/// Example 8: Error Handling
const example8 = () => {
    /************************************
     * Always wrap timer callbacks in try-catch
     * to prevent unhandled rejections
     ************************************/
    setTimeout(() => {
        try {
            throw new Error('Example 8: Simulated error');
        } catch (error) {
            console.log('🚨 Example 8: Error caught:', error.message);
        }
    }, 1000);
};

/// Example 9: Advanced Chaining Pattern
const example9 = () => {
    /************************************
     * Creates a chainable sequence of delayed executions
     * Each step can have its own delay and callback
     ************************************/
    const chainedTimeout = (fn, delay) => ({
        then: (nextFn, nextDelay) => {
            setTimeout(() => {
                fn();
                chainedTimeout(nextFn, nextDelay);
            }, delay);
            return chainedTimeout;
        }
    });

    chainedTimeout(
        () => console.log('🥇 Example 9: First'), 
        1000
    ).then(
        () => console.log('🥈 Example 9: Second'), 
        2000
    ).then(
        () => console.log('🥉 Example 9: Third'), 
        3000
    );
};

/// Example 10: Debounced Function
const example10 = () => {
    /************************************
     * Debouncing prevents function spam by waiting
     * for a pause in function calls
     * @param {Function} fn - Function to debounce
     * @param {number} delay - Delay in milliseconds
     ************************************/
    const debounce = (fn, delay) => {
        let timeoutId;
        
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    };

    // Usage example
    const debouncedLog = debounce(
        (text) => console.log(`🎯 Example 10: ${text}`),
        1000
    );

    debouncedLog('First call');  // Will be cancelled
    debouncedLog('Second call'); // Will be cancelled
    debouncedLog('Final call');  // This one will execute
};

/**** BEST PRACTICES 👇
 * 1. Always store timeout/interval IDs
 * 2. Clear timers when they're no longer needed
 * 3. Use recursive setTimeout for precise timing
 * 4. Handle errors in timer callbacks
 * 5. Be mindful of closure scope in callbacks
 * 6. Use arrow functions for consistent 'this' binding
 ************************************/

// Follow X.com/@BilliCodes