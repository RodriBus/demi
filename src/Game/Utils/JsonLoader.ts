export default class JsonLoader {
    private xhr: XMLHttpRequest = new XMLHttpRequest();
    constructor(public url: string) {
        this.xhr.open("GET", this.url, true);
    }
    public load(cb: (parsedJson: string) => any) {
        let self = this;
        this.xhr.send();
        this.xhr.onreadystatechange = function() {
            if (self.xhr.readyState == 4 && self.xhr.status == 200) {
                cb(self.xhr.responseText);
            }
        }
    }
}
