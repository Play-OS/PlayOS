import Configuration from "../../Configuration";
import IProvider from "./IProvider";

interface CallRpcRequest {
    from?: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: string;
}

interface RpcResponse {
    id: number;
    jsonrpc: string;
    result: any;
}

async function createRpcRequest(url: string, method: string, params: any[]): Promise<RpcResponse> {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method,
            params,
        }),
    });

    const data: RpcResponse = await response.json();

    return data;
}

/**
 * Executes the RPC call in rutile
 *
 * @export
 * @param {string} rpcUrl
 * @param {CallRpcRequest} params
 * @returns
 */
export function executeRutileRpcCall(rpcUrl: string, params: CallRpcRequest) {
    const data = [
        params,
        'latest',
    ];

    return createRpcRequest(rpcUrl, 'eth_call', data);
}

export function getTransactionReceipt() {

}
