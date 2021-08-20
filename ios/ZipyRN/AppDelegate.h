#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <AppsFlyerLib/AppsFlyerLib.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, AppsFlyerLibDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
