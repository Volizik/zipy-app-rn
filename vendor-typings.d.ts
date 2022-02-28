declare module 'react-native-dotenv';
declare module 'react-native-user-agent';
declare module 'react-native-siren' {
    export interface PerformCheckOptions {
        country?: string;
        bundleId?: string;
    }
    export interface PerformCheckResult {
        updateIsAvailable: boolean;
        // there are also some optional info if succeed responce received
    }
    export function performCheck(options: PerformCheckOptions): Promise<PerformCheckResult>
}
