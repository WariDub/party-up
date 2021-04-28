import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(() => {
        appService = new AppService();
        appController = new AppController(appService);
    });

    describe('ping', () => {
        it('should return "pong!"', async () => {
            expect(await appController.ping()).toBe('pong!');
        });
    });
});
