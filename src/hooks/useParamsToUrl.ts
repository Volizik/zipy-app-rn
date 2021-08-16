export const useParamsToUrl = () => {
    const versionParam = "zipy_version=3";
    const utmParams = "utm_medium=app&utm_source=app_ios";
    
    const addParamsToUrl = (url: string): string => {
        let params = "";
    
        if (!url.includes(versionParam)) {
            params = versionParam;
        }
    
        if (!url.includes(utmParams)) {
            params += params === "" ? utmParams : "&" + utmParams;
        }
    
        // if all params already in the url
        if (params === "") return url;
    
        const finalParams = (url.includes("?") ? "&" : "?") + params;
    
        if (url.includes("#")) {
            const urlArray = url.split("#");
            return urlArray[0] + finalParams + "#" + urlArray[1];
        } else {
            return url += finalParams;
        }
    }

    const hasVersionParam = (url: string) => url.includes(versionParam)


    return {
        addParamsToUrl,
        hasVersionParam,
    }
}