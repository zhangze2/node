import { Expect, Test, TestCase } from 'alsatian'

import { Signature } from '../src/Helpers/Signature'
import { Work } from '../src/Interfaces'
import { PrivateKey, TheRaven } from './Claims'
import {IllegalArgumentException} from '../src/API/Exceptions'

export class SignatureTest {

  @Test()
  @TestCase(TheRaven)
  public signature(work: Work) {
    Expect(Signature.signClaim(work, PrivateKey)).toBe(work.signature)
  }

  @Test()
  @TestCase(TheRaven)
  public signatureMissingId(work: Work) {
    Expect(() => Signature.signClaim({...work, id: ''}, PrivateKey))
      .toThrowError(IllegalArgumentException, 'Cannot sign a claim that has an empty .id field.')
  }

  @Test()
  @TestCase(TheRaven)
  public signatureIncorrectId(work: Work) {
    Expect(() => Signature.signClaim({
      ...work, id: 'be81cc75bcf6ca0f1fdd356f460e6ec920ba36ec78bd9e70c4d04a19f8943102'
    }, PrivateKey)).toThrowError(IllegalArgumentException, 'Cannot sign a claim whose id has been altered or generated incorrectly.')
  }

  @Test()
  @TestCase(TheRaven)
  public signatureMissingPublicKey(work: Work) {
    Expect(() => Signature.signClaim({
      ...work, publicKey: undefined
    }, PrivateKey)).toThrowError(IllegalArgumentException, 'Cannot sign a claim that has an empty .publicKey field.')
  }

  @Test()
  @TestCase(TheRaven)
  public signatureIncorrectPublicKey(work: Work) {
    Expect(() => Signature.signClaim({
      ...work, publicKey: '03f0dc475e93105bdc7701b40003200039202ffd4a0789696c78f9b34d5518aef9'
    }, PrivateKey)).toThrowError(IllegalArgumentException, 'Cannot sign this claim with the provided privateKey. It doesn\t match the claim\'s public key.')
  }
}