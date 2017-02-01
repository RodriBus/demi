import BackgroundEntity from "./Entities/BackgroundEntity";
import Config from "./Config";
export default class MapParser {
    public static parseFromStr(str: string) {
        let arr = str.split('\n');
        for (let i = 0, l = arr.length; i < l; i++) {
            let row = arr[i];
            //remove white spaces
            row = row.replace(/\s/g, '');
            let rowArr = row.split('');
            for (let j = 0, l = rowArr.length; j < l; j++) {
                let char = rowArr[j];

                switch (char) {
                    case 'F'://fence
                        //instance bg til
                        new BackgroundEntity('t_fence_grass',
                            true,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case '4'://fence
                        //instance bg til
                        new BackgroundEntity('t_fence_tile',
                            true,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'f'://fence
                        //instance bg til
                        new BackgroundEntity('t_grass_flower',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'G'://grass
                        if (randexec() === 2) {
                            new BackgroundEntity('t_grass_flower',
                                false,
                                j * Config.tileSize,
                                i * Config.tileSize,
                                Config.tileSize,
                                Config.tileSize)
                        } else {
                            new BackgroundEntity('t_grass',
                                false,
                                j * Config.tileSize,
                                i * Config.tileSize,
                                Config.tileSize,
                                Config.tileSize)
                        }
                        //instance bg tile
                        break;
                    case 'g'://greass-left
                        new BackgroundEntity('t_grass_right',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        //instance bg tile
                        break;
                    case '6'://grass-rigt
                        new BackgroundEntity('t_grass_left',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        //instance bg tile
                        break;
                    case 't'://grass-rigt
                        new BackgroundEntity('t_grass_bottom',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        //instance bg tile
                        break;
                    case 'b'://grass-rigt
                        new BackgroundEntity('t_grass_top',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        //instance bg tile
                        break;
                    case 'z'://grass-rigt
                        new BackgroundEntity('t_grass_top_left',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        //instance bg tile
                        break;
                    case 'c'://grass-rigt
                        new BackgroundEntity('t_grass_top_right',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        //instance bg tile
                        break;
                    case 'd'://grass-rigt
                        new BackgroundEntity('t_grass_bottom_right',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        //instance bg tile
                        break;
                    case 'n'://grass-rigt
                        new BackgroundEntity('t_grass_bottom_left',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        //instance bg tile
                        break;
                    case 'T'://tile
                        //instance bg tile
                        new BackgroundEntity('t_tile',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'S'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sign_grass',
                            true,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'X'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'U'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand_top',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'M'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand_bottom',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'W'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand_left',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'P'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand_right',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case '1'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand_top_left',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'I'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand_top_right',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'Q'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand_bottom_left',
                            false,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                    case 'L'://tile
                        //instance bg tile
                        new BackgroundEntity('t_sand_bottom_right',
                            true,
                            j * Config.tileSize,
                            i * Config.tileSize,
                            Config.tileSize,
                            Config.tileSize)
                        break;
                }
            }
        }

        function randexec() {
            function a() { return 0; }
            function b() { return 1; }
            function c() { return 2; }
            let funcs = [a, b, c]; // the functions array
            let probas = [20, 75, 5]; // 20%, 70% and 10%
            let ar: any = [];
            let i: any, sum = 0;


            // that following initialization loop could be done only once above that
            // randexec() function, we let it here for clarity

            for (i = 0; i < probas.length - 1; i++) // notice the '-1'
            {
                sum += (probas[i] / 100.0);
                ar[i] = sum;
            }


            // Then we get a random number and finds where it sits inside the probabilities
            // defined earlier

            let r = Math.random(); // returns [0,1]

            for (i = 0; i < ar.length && r >= ar[i]; i++);

            // Finally execute the function and return its result

            return (funcs[i])();
        }

    }
}
