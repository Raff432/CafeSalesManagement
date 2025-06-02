import React, { useEffect, useState, useRef } from 'react';
import { XIcon, SmartphoneIcon } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { toast } from 'sonner';
export const QRScanner = ({
  onClose,
  onScan
}) => {
  const [error, setError] = useState(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [loyaltyInfo, setLoyaltyInfo] = useState(null);
  const scannerRef = useRef(null);
  useEffect(() => {
    const html5QrCode = new Html5Qrcode('qr-reader');
    scannerRef.current = html5QrCode;
    html5QrCode.start({
      facingMode: 'environment'
    }, {
      fps: 10,
      qrbox: {
        width: 250,
        height: 250
      }
    }, decodedText => {
      try {
        const data = JSON.parse(decodedText);
        if (data.loyaltyId && data.customerName) {
          setLoyaltyInfo(data);
          setScanComplete(true);
          html5QrCode.stop();
          toast.success('Loyalty card scanned successfully!');
        } else if (data.orderId && data.items) {
          html5QrCode.stop().then(() => {
            onScan({
              ...data,
              loyaltyInfo: null
            });
          });
        } else {
          setError('Invalid QR code format');
        }
      } catch (e) {
        setError('Could not read QR code');
      }
    }, errorMessage => {
      // Ignore errors - they happen frequently during scanning
    }).catch(err => {
      setError('Could not start camera');
      toast.error('Could not start camera');
    });
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error('Failed to stop scanner:', err));
      }
    };
  }, [onScan]);
  const handleConfirmLoyalty = () => {
    onScan({
      loyaltyInfo,
      orderId: Date.now(),
      items: []
    });
    toast.success(`Welcome back, ${loyaltyInfo.customerName}!`);
  };
  const handleClose = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().then(() => onClose()).catch(err => {
        console.error('Failed to stop scanner:', err);
        onClose();
      });
    } else {
      onClose();
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Scan Customer QR Code</h2>
            <p className="text-sm text-gray-500">
              Scan loyalty card or saved order QR code
            </p>
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={24} />
          </button>
        </div>
        {scanComplete && loyaltyInfo ? <div className="text-center py-4">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <SmartphoneIcon size={32} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Loyalty Card Detected
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 font-medium">
                {loyaltyInfo.customerName}
              </p>
              <p className="text-gray-500 text-sm">
                Loyalty ID: {loyaltyInfo.loyaltyId}
              </p>
              <p className="text-pink-600 font-medium mt-2">
                Points Available: {loyaltyInfo.points || 0}
              </p>
            </div>
            <button onClick={handleConfirmLoyalty} className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors">
              Continue with Loyalty Card
            </button>
          </div> : <>
            <div className="relative">
              <div id="qr-reader" className="overflow-hidden rounded-lg mb-4" />
              <div className="absolute inset-0 border-2 border-pink-500 border-dashed rounded-lg pointer-events-none" />
            </div>
            <div className="text-center mt-4">
              <div className="flex items-center justify-center text-gray-600 mb-2">
                <div className="mr-2" size={20} />
                <span>Position QR code in the frame</span>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </>}
      </div>
    </div>;
};