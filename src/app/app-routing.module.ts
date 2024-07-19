import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'meals/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  { path: 'cart-modal', loadChildren: () => import('./cart-modal/cart-modal.module').then(m => m.CartModalPageModule) },
  
  {
    path: '',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  // {
  //   path: 'categories',
  //   loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  // },
  {
    path: 'categories/:id',
    loadChildren: () => import('./category-single/category-single.module').then( m => m.CategorySinglePageModule)
  },
  {
    path: 'meal',
    loadChildren: () => import('./meal/meal.module').then( m => m.MealPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'orders/:id',
    loadChildren: () => import('./order-single/order-single.module').then( m => m.OrderSinglePageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'address-selection',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'payment-success',
    loadChildren: () => import('./payment-success/payment-success.module').then( m => m.PaymentSuccessPageModule)
  },
  {
    path: 'payment-error',
    loadChildren: () => import('./payment-error/payment-error.module').then( m => m.PaymentErrorPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'tablinks',
    loadChildren: () => import('./tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  },
  {
    path: 'view-order',
    loadChildren: () => import('./view-order/view-order.module').then( m => m.ViewOrderPageModule)
  },
  {
    path: 'address-selection',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'success-add-address',
    loadChildren: () => import('./success-add-address/success-add-address.module').then( m => m.SuccessAddAddressPageModule)
  },
  {
    path: 'onboard',
    loadChildren: () => import('./onboard/onboard.module').then( m => m.OnboardPageModule)
  },
  {
    path: 'book-table',
    loadChildren: () => import('./payment-booking/payment-booking.module').then( m => m.PaymentBookingPageModule)
  },
  {
    path: 'takeaway-summary',
    loadChildren: () => import('./payment-takeaway/payment-takeaway.module').then( m => m.PaymentTakeawayPageModule)
  },  {
    path: 'booking-summary',
    loadChildren: () => import('./booking-summary/booking-summary.module').then( m => m.BookingSummaryPageModule)
  },
  {
    path: 'rewards',
    loadChildren: () => import('./rewards/rewards.module').then( m => m.RewardsPageModule)
  },
  {
    path: 'redeem',
    loadChildren: () => import('./redeem/redeem.module').then( m => m.RedeemPageModule)
  },


 
  // {
  //   path: 'category-single/:id',
  //   loadChildren: () => import('./category-single/category-single.module').then( m => m.CategorySinglePageModule)
  // },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
