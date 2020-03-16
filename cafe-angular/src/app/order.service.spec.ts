import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OrderService } from './order.service';
import { Order } from './order';
import { Customer } from './customer';
import { MenuItem } from './menu-item';
import { Address } from './address';
import { OrderItem } from './order-item';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlService } from './url.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let url: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(OrderService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = TestBed.inject(UrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    let orderArray:Array<Order> = [];
    let order:Order = new Order();
    order.price = 6.78;
    order.customer = new Customer();
    order.customer.first = "Test";
    order.customer.last = "Customer";
    order.address = new Address();
    order.address.address = "12 Baker St";
    order.orderItems = [new OrderItem(), new OrderItem()];
    order.orderItems[0].menuItem = new MenuItem();
    order.orderItems[0].menuItem.name = "toast";
    order.orderItems[0].quantity = 2;
    order.orderItems[1].menuItem = new MenuItem();
    order.orderItems[1].menuItem.name = "baked beans";
    order.orderItems[1].quantity = 2;
    order.orderTime = new Date("2021-01-09T14:17:23");
    order.lastActionTime = new Date("2021-01-09T14:23:58");
    console.log(order);
    orderArray.push(order);
  
    // Make an HTTP GET request
    httpClient.get<Array<Order>>(url.getPendingOrdersUrl())
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(orderArray)
      );
  
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(url.getPendingOrdersUrl());
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
  
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(orderArray);
  
    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});
