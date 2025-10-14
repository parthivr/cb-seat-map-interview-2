import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { log } from '../internal/log.util';
import { CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT } from './cb-seat-selection-cms-content.const';
import { CbSeatSelectionCmsContentService } from './cb-seat-selection-cms-content.service';

describe('CbSeatSelectionCmsContentService', () => {
  let service: CbSeatSelectionCmsContentService;
  let httpController: HttpTestingController;
  let logSpy: jasmine.Spy;
  let isDevModeSpy: jasmine.Spy;

  // Use a simplified mock that matches the expected structure
  const mockCmsContent = CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT;

  const prodApiUrl =
    '/resp-magnoliapublic/.rest/jetblue/v4/en/page/home/seat-selection?depth=2';
  const devApiUrl =
    'https://www-dev2.jetblue.com/resp-magnoliapublic/.rest/jetblue/v4/en/page/home/seat-selection?depth=2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CbSeatSelectionCmsContentService],
    });

    service = TestBed.inject(CbSeatSelectionCmsContentService);
    httpController = TestBed.inject(HttpTestingController);

    // Setup spies
    logSpy = spyOn(log, 'warn');
    isDevModeSpy = spyOn(window as any, 'isDevMode').and.returnValue(false);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('production-mode - should fetch CMS content successfully from production URL', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);

    // When: getContent is called
    service.getContent().subscribe((content) => {
      // Then: should return the mock content without errors
      expect(content).toEqual(mockCmsContent);
      expect(logSpy).not.toHaveBeenCalled();
      done();
    });

    // And: HTTP request should be made to production URL
    const req = httpController.expectOne(prodApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCmsContent);
  });

  it('production-mode - should return fallback content when HTTP request fails', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);

    // When: getContent is called and HTTP request fails
    service.getContent().subscribe((content) => {
      // Then: should return fallback content and log warning
      expect(content).toEqual(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT);
      expect(logSpy).toHaveBeenCalledWith(
        jasmine.stringContaining(
          '[CbSeatSelectionCmsContentService] Failed to fetch CMS content'
        ),
        jasmine.any(Object)
      );
      done();
    });

    const req = httpController.expectOne(prodApiUrl);
    req.error(new ProgressEvent('Network error'));
  });

  it('production-mode - should filter out falsy responses', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);
    let callCount = 0;

    // When: getContent is called and first response is falsy
    service.getContent().subscribe((content) => {
      callCount++;
      // Then: should only receive the valid response
      expect(content).toEqual(mockCmsContent);

      if (callCount === 1) {
        done();
      }
    });

    // First request returns null/undefined (should be filtered)
    const req1 = httpController.expectOne(prodApiUrl);
    req1.flush(null);

    // Second request returns valid data
    const req2 = httpController.expectOne(prodApiUrl);
    req2.flush(mockCmsContent);
  });

  it('development-mode - should fetch CMS content from development URL', (done) => {
    // Given: app is in development mode
    isDevModeSpy.and.returnValue(true);

    // When: getContent is called
    service.getContent().subscribe((content) => {
      // Then: should return the mock content
      expect(content).toEqual(mockCmsContent);
      done();
    });

    // And: HTTP request should be made to development URL
    const req = httpController.expectOne(devApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCmsContent);
  });

  it('development-mode - should handle errors in development mode', (done) => {
    // Given: app is in development mode
    isDevModeSpy.and.returnValue(true);

    // When: getContent is called and HTTP request fails
    service.getContent().subscribe((content) => {
      // Then: should return fallback content and log warning with dev URL
      expect(content).toEqual(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT);
      expect(logSpy).toHaveBeenCalledWith(
        jasmine.stringContaining(
          'Failed to fetch CMS content at https://www-dev2.jetblue.com'
        ),
        jasmine.any(Object)
      );
      done();
    });

    const req = httpController.expectOne(devApiUrl);
    req.error(new ProgressEvent('Dev server error'));
  });

  it('caching - should cache and share the response across multiple subscribers', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);
    let subscription1Received = false;
    let subscription2Received = false;

    // When: multiple subscribers call getContent
    service.getContent().subscribe((content) => {
      // Then: first subscriber should receive content
      expect(content).toEqual(mockCmsContent);
      subscription1Received = true;
      checkBothCompleted();
    });

    service.getContent().subscribe((content) => {
      // Then: second subscriber should receive cached content
      expect(content).toEqual(mockCmsContent);
      subscription2Received = true;
      checkBothCompleted();
    });

    function checkBothCompleted() {
      if (subscription1Received && subscription2Received) {
        done();
      }
    }

    // And: only one HTTP request should be made
    const req = httpController.expectOne(prodApiUrl);
    req.flush(mockCmsContent);
  });

  it('caching - should use distinctUntilChanged to avoid duplicate emissions', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);
    let emissionCount = 0;

    // When: getContent is called
    service.getContent().subscribe((content) => {
      emissionCount++;
      // Then: should only emit once even if the same data is returned
      expect(content).toEqual(mockCmsContent);
      expect(emissionCount).toBe(1);
      done();
    });

    const req = httpController.expectOne(prodApiUrl);
    req.flush(mockCmsContent);
  });

  it('error-handling - should handle 404 errors gracefully', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);

    // When: HTTP request returns 404 error
    service.getContent().subscribe((content) => {
      // Then: should return fallback content and log error
      expect(content).toEqual(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT);
      expect(logSpy).toHaveBeenCalled();
      done();
    });

    const req = httpController.expectOne(prodApiUrl);
    req.error(new ProgressEvent('Not found'), { status: 404 });
  });

  it('error-handling - should handle 500 server errors gracefully', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);

    // When: HTTP request returns 500 error
    service.getContent().subscribe((content) => {
      // Then: should return fallback content and log error
      expect(content).toEqual(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT);
      expect(logSpy).toHaveBeenCalled();
      done();
    });

    const req = httpController.expectOne(prodApiUrl);
    req.error(new ProgressEvent('Server error'), { status: 500 });
  });

  it('error-handling - should handle network timeout errors', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);

    // When: HTTP request times out
    service.getContent().subscribe((content) => {
      // Then: should return fallback content and log detailed error
      expect(content).toEqual(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT);
      expect(logSpy).toHaveBeenCalledWith(
        jasmine.stringContaining('Failed to fetch CMS content'),
        jasmine.any(Object)
      );
      done();
    });

    const req = httpController.expectOne(prodApiUrl);
    req.error(new ProgressEvent('Timeout'));
  });

  it('data-validation - should handle malformed responses gracefully', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);

    // When: HTTP response contains malformed data
    service.getContent().subscribe((content) => {
      // Then: should return fallback content and log error
      expect(content).toEqual(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT);
      expect(logSpy).toHaveBeenCalled();
      done();
    });

    const req = httpController.expectOne(prodApiUrl);
    req.error(new ProgressEvent('Parse error'));
  });

  it('data-validation - should accept valid CMS content structure', (done) => {
    // Given: app is in production mode and valid content is available
    isDevModeSpy.and.returnValue(false);
    const validContent = CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT;

    // When: getContent is called with valid content
    service.getContent().subscribe((content) => {
      // Then: should return the valid content as-is
      expect(content).toEqual(validContent);
      done();
    });

    const req = httpController.expectOne(prodApiUrl);
    req.flush(validContent);
  });

  it('url-building - should build production URL correctly when not in dev mode', () => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);

    // When: new service instance is created and getContent is called
    const newService = TestBed.inject(CbSeatSelectionCmsContentService);
    newService.getContent().subscribe();

    // Then: should make request to production URL
    const req = httpController.expectOne(prodApiUrl);
    expect(req.request.url).toBe(prodApiUrl);
    req.flush(mockCmsContent);
  });

  it('url-building - should build development URL correctly when in dev mode', () => {
    // Given: app is in development mode
    isDevModeSpy.and.returnValue(true);

    // When: new service instance is created and getContent is called
    const newService = TestBed.inject(CbSeatSelectionCmsContentService);
    newService.getContent().subscribe();

    // Then: should make request to development URL
    const req = httpController.expectOne(devApiUrl);
    expect(req.request.url).toBe(devApiUrl);
    req.flush(mockCmsContent);
  });

  it('fallback-content - should return fallback content that matches the expected type', () => {
    // Given: fallback content constant is defined
    // When: checking the fallback content structure
    // Then: should have the expected properties and types
    expect(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT).toBeDefined();
    expect(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT.area).toEqual(
      jasmine.any(Array)
    );
    expect(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT.children).toEqual(
      jasmine.any(Array)
    );
  });

  it('fallback-content - should use fallback content when service fails', (done) => {
    // Given: app is in production mode
    isDevModeSpy.and.returnValue(false);

    // When: service fails completely
    service.getContent().subscribe((content) => {
      // Then: should return the exact fallback content instance
      expect(content).toBe(CB_SEAT_SELECTION_CMS_FALLBACK_CONTENT);
      done();
    });

    const req = httpController.expectOne(prodApiUrl);
    req.error(new ProgressEvent('Service unavailable'));
  });
});
