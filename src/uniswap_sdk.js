import {ChainId, Token, WETH, Fetcher, Route, TokenAmount, Trade, TradeType, Percent, Rounding} from '@uniswap/sdk'
import {AlchemyProvider} from "@ethersproject/providers";
import {ethers} from "ethers";
import JSBI from "jsbi";

const UNI = new Token(ChainId.MAINNET, '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', 18)
const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6)

async function getPriceInfo() {
    const provider = new AlchemyProvider("homestead", "19Snk0zWTRVHWoA_POcwOBdvEZPDUzd0")

    const UNI_WETH = await Fetcher.fetchPairData(UNI, WETH[UNI.chainId], provider)
    const USDT_WETH = await Fetcher.fetchPairData(WETH[UNI.chainId], USDT, provider)

    const route = new Route([UNI_WETH, USDT_WETH], UNI)

    console.log(route.midPrice.toSignificant(10,{ groupSeparator: '' }, 6)) // 24.74633313
    console.log(route.midPrice.invert().toSignificant(10,{ groupSeparator: '' }, 6)) // 0.0404100274
}

async function getPriceImpact() {
    const providerMetamask = new ethers.providers.Web3Provider(window.ethereum)

    const UNI_WETH = await Fetcher.fetchPairData(UNI, WETH[UNI.chainId], providerMetamask)
    const USDT_WETH = await Fetcher.fetchPairData(WETH[UNI.chainId], USDT, providerMetamask)

    const route = new Route([UNI_WETH, USDT_WETH], UNI)
    const amountIn = ethers.utils.parseUnits("1111", 18)

    const trade = new Trade(route, new TokenAmount(UNI, amountIn), TradeType.EXACT_INPUT)
    const priceImpact = trade.priceImpact.multiply(JSBI.BigInt(10000)).toFixed(0,{ groupSeparator: '' }, Rounding.ROUND_DOWN).toString()
    const slippageTolerance = new Percent(priceImpact, '100000') // 50 bips, or 0.50%

    console.log(trade.priceImpact.toFixed(10))
    console.log(priceImpact)
    console.log(slippageTolerance.toSignificant(10,{ groupSeparator: '' }, Rounding.ROUND_DOWN))

    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
    const path = [UNI.address, WETH[UNI.chainId].address, USDT.address]
    const to = '' // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
    const value = trade.inputAmount.raw // // needs to be converted to e.g. hex

    console.log(value.toString())
    console.log(amountOutMin.toString())
    console.log(path)
    console.log(deadline)
}

// getPriceInfo()
// getPriceImpact()
