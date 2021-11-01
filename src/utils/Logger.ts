import chalk from "chalk";

export class Logger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly colors: { [key: string]: any } = {
        success: "greenBright",
        info: "blueBright",
        warn: "yellowBright",
        error: "redBright",
    };

	private get dateTime() {
		return new Intl.DateTimeFormat("sv-SE", {
			timeZone: "UCT",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
			timeZoneName: "short",
		}).format(new Date());
	}

    log(type: string, message: string) {
        return console.log(
            `[${this.dateTime}] ${chalk[this.colors[type]](type)}: ${message}`
        );
    }

    success(message: string) {
        return this.log("success", message);
    }

    info(message: string) {
        return this.log("info", message);
    }

    warn(message: string) {
        return this.log("warn", message);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(error: any) {
        const message = error instanceof Error ? error.message : error;

        return this.log("error", message);
    }
}
