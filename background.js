const url = 'https://www.lrt.lt/mediateka/tiesiogiai/lrt-televizija'


chrome.runtime.onInstalled.addListener(() => {


    chrome.action.onClicked.addListener(async (tab) => {

        console.log('tab', tab);

        if (tab.url.startsWith(url)) {
            // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
            const prevState = await chrome.action.getBadgeText({tabId: tab.id});
            // Next state will always be the opposite
            const nextState = prevState === 'ON' ? 'OFF' : 'ON'

            // Set the action badge to the next state
            await chrome.action.setBadgeText({
                tabId: tab.id,
                text: nextState,
            });

            console.log({nextState});


            if (nextState === "ON") {
                // Insert the CSS file when the user turns the extension on
                await chrome.scripting.insertCSS({
                    files: ["./style.css"],
                    target: { tabId: tab.id },
                });
            } else if (nextState === "OFF") {
                // Remove the CSS file when the user turns the extension off
                await chrome.scripting.removeCSS({
                    files: ["./style.css"],
                    target: { tabId: tab.id },
                });
            }
        }
    })

})


