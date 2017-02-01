export default class Utils {
    public static getOne(...args: any[]) {
        // var args = Array.prototype.slice.call(arguments);
        var rand = args[Math.floor(Math.random() * args.length)];
        return rand;
    }

    public static copyObject<T>(object: T): T {
        var objectCopy = <T>{};

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = object[key];
            }
        }

        return objectCopy;
    }
}
