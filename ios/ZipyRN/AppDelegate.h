#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <AppsFlyerLib/AppsFlyerLib.h>
@import GoogleSignIn;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, GIDSignInDelegate, AppsFlyerLibDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
