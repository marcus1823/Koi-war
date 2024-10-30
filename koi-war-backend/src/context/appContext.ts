// Service Locator Pattern
export class AppContext {
    private static services = new Map<string, any>();

    static register<T>(name: string, instance: T): void {
        AppContext.services.set(name, instance);
    }

    static get<T>(name: string): T {
        const service = AppContext.services.get(name);
        if (!service) {
            throw new Error(`Service ${name} not found`);
        }
        return service;
    }
}