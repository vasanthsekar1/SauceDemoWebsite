export class RandomUtils {

    static randomNumber(
        min: number,
        max: number
    ): number {

        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

    static randomString(
        length: number
    ): string {

        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        let result = "";

        for (let i = 0; i < length; i++) {

            result += chars.charAt(
                Math.floor(Math.random() * chars.length)
            );
        }

        return result;
    }

    static randomEmail(): string {

        return `user_${Date.now()}@test.com`;
    }

    static randomUsername(): string {

        return `user_${Date.now()}`;
    }
}